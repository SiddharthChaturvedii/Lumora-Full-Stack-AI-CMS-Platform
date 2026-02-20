import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateSeedData = mutation({
    args: {},
    handler: async (ctx) => {
        // 1. Create Fake Users
        const users = [
            { name: "Alice Writer", email: "alice@example.com", tokenIdentifier: "fake_alice", username: "alicewrites", imageUrl: "https://i.pravatar.cc/150?u=alice" },
            { name: "Bob Creator", email: "bob@example.com", tokenIdentifier: "fake_bob", username: "bobcreator", imageUrl: "https://i.pravatar.cc/150?u=bob" },
            { name: "Charlie Dev", email: "charlie@example.com", tokenIdentifier: "fake_charlie", username: "charliedev", imageUrl: "https://i.pravatar.cc/150?u=charlie" },
            { name: "Dana Designer", email: "dana@example.com", tokenIdentifier: "fake_dana", username: "danadesign", imageUrl: "https://i.pravatar.cc/150?u=dana" },
            { name: "Evan Editor", email: "evan@example.com", tokenIdentifier: "fake_evan", username: "evanedit", imageUrl: "https://i.pravatar.cc/150?u=evan" },
        ];

        const userIds = [];
        for (const user of users) {
            const existing = await ctx.db
                .query("users")
                .withIndex("by_email", (q) => q.eq("email", user.email))
                .first();

            if (existing) {
                userIds.push(existing._id);
            } else {
                const id = await ctx.db.insert("users", {
                    ...user,
                    createdAt: Date.now(),
                    lastActiveAt: Date.now(),
                });
                userIds.push(id);
            }
        }

        // 2. Create Posts
        const postTemplates = [
            { title: "The Future of AI in Content Creation", category: "Technology", tags: ["AI", "Tech", "Future"] },
            { title: "10 Tips for Healthier Remote Work", category: "Health", tags: ["Remote Work", "Health", "Tips"] },
            { title: "Understanding React Server Components", category: "Coding", tags: ["React", "Next.js", "Web Dev"] },
            { title: "Minimalist Design Trends 2026", category: "Design", tags: ["Design", "Minimalism", "UI/UX"] },
            { title: "Why I Switched to Convex", category: "Technology", tags: ["Backend", "Database", "Convex"] },
            { title: "My Journey as a Digital Nomad", category: "Lifestyle", tags: ["Travel", "Work", "Nomad"] },
            { title: "Top 5 Photography Gear for Beginners", category: "Photography", tags: ["Photo", "Gear", "Guide"] },
            { title: "How to Bake the Perfect Sourdough", category: "Food", tags: ["Baking", "Food", "Recipe"] },
        ];

        const postIds = [];
        for (const template of postTemplates) {
            const authorId = userIds[Math.floor(Math.random() * userIds.length)];

            const stats = {
                views: Math.floor(Math.random() * 5000) + 100,
                likes: Math.floor(Math.random() * 500) + 10,
            };

            const id = await ctx.db.insert("posts", {
                title: template.title,
                content: JSON.stringify({ ops: [{ insert: `This is the content for ${template.title}. It explores deep concepts about ${template.category}. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.` }] }), // Simple Quill delta format
                status: "published",
                authorId: authorId,
                category: template.category,
                tags: template.tags,
                featuredImage: `https://source.unsplash.com/random/800x600?${template.category.toLowerCase()}`,

                createdAt: Date.now() - Math.floor(Math.random() * 1000000000), // Random time in past
                updatedAt: Date.now(),
                publishedAt: Date.now(),

                viewCount: stats.views,
                likeCount: stats.likes,
            });
            postIds.push(id);
        }

        // 3. Create Comments & Likes
        for (const postId of postIds) {
            // Add random comments
            const numComments = Math.floor(Math.random() * 5);
            for (let i = 0; i < numComments; i++) {
                const commenterId = userIds[Math.floor(Math.random() * userIds.length)];
                const commenter = await ctx.db.get(commenterId);

                await ctx.db.insert("comments", {
                    postId,
                    authorId: commenterId,
                    authorName: commenter.name,
                    authorEmail: commenter.email,
                    content: "This is a great article! Thanks for sharing.",
                    status: "approved",
                    createdAt: Date.now(),
                });
            }

            // Add random likes (records)
            const numLikes = Math.floor(Math.random() * 5);
            // Note: This won't match the 'likeCount' on the post exactly, but serves as record data
            for (let i = 0; i < numLikes; i++) {
                const likerId = userIds[Math.floor(Math.random() * userIds.length)];
                // Check duplicate
                const existing = await ctx.db.query("likes").withIndex("by_post_user", q => q.eq("postId", postId).eq("userId", likerId)).first();
                if (!existing) {
                    await ctx.db.insert("likes", {
                        postId,
                        userId: likerId,
                        createdAt: Date.now(),
                    });
                }
            }
        }

        return "Successfully seeded database with Users, Posts, Comments, and Likes!";
    },
});
