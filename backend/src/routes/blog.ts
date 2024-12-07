import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import {updateBlogInput,createBlogInput} from '@prasadgurude/meduyn-common'
import { string } from 'zod';


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
    Variables:{
        userId:string
    }
}>(); 

blogRouter.use("/*",async (c,next)=>{
    const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const user = await verify(token, c.env.JWT_SECRET);
	if (user) {   
        c.set("userId", user.id as string);
        await next()
	} 
    c.status(403);
    return c.json({ error: "unauthorized" });
}) 



blogRouter.post('/',async (c) => {
    const body =await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message:"Input is not currect"
        })
    }

    const blog = await prisma.blog.create({
        data:{
            content:body.content,
            title:body.title,
            authorId:Number(authorId)
        }
    })

	return c.json({
        blog
    })
})

blogRouter.put('/',async (c) => {
    const body =await c.req.json();
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message:"Input is not currect"
        })
    }

    const blog = await prisma.blog.update({
        where:{
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

	return c.json({
        id:blog.id
    })
}) 

// Add paginatio here to make it more efficient

blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blogs = await prisma.blog.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

    return c.json(blogs)
    }catch(e){
        console.log(e)
        c.status(400)
        return c.text("error while fetching all blogs")
    }
})

blogRouter.get('/:id',async (c) => {
    const id =await c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    }catch(e){
        console.log(e);
        c.status(411)
        return c.text("something went wrong while feching blog");
    }
})
