import React from 'react';

const blogHighlights = [
  {
    title: '5 Strategies to Monetize Your Content in 2024',
    description:
      'Discover proven tactics to maximize your revenue as a creator.',
    link: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'Top Tools for Building a Community',
    description:
      'Learn the best tools to grow and engage your audience.',
    link: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    title: 'How to Launch Your First Online Course',
    description:
      'Step-by-step guide for educators and creators.',
    link: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D',
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          Explore Our Latest Blogs
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
          Stay informed with tips, trends, and insights to
          grow your digital business.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogHighlights.map((blog, index) => (
          <div
            key={index}
            className="group rounded-xl border border-gray-100 bg-white/50 p-6 shadow-sm backdrop-blur-sm hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold text-purple-600 group-hover:text-pink-600">
              {blog.title}
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              {blog.description}
            </p>
            <a
              href={blog.link}
              className="text-sm font-medium text-purple-600 hover:text-pink-600"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
