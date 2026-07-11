# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, React, TypeScript, and Tailwind CSS. Features a clean design inspired by GitHub's aesthetic, with smooth animations and dark mode support.

## Features

- 🌓 Dark/Light mode
- ⚡ Next.js 14 with App Router
- 💨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🎨 Custom animations using Framer Motion
- 🎯 Interactive particle background
- 📧 Contact form with FormSubmit email delivery
- 🔍 SEO optimized
- 🎆 Smooth page transitions
- ♿ Accessible UI components

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide Icons
- **Email:** FormSubmit
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. No environment variables are required for the contact form. Messages are delivered to `minicm034@gmail.com` via FormSubmit. On the first submission, check that inbox for an activation email and confirm it.

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-website/
├── src/
│   ├── app/               # Next.js app router files
│   ├── components/        # React components
│   │   ├── animations/    # Animation components
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── public/               # Static files
└── ...config files
```

## Customization

1. **Personal Information**: Update `src/lib/constants.ts` with your information.
2. **Colors**: Modify the color scheme in `tailwind.config.ts`.
3. **Content**: Edit the section components in `src/components/sections/`.
4. **Images**: Replace images in the `public/images/` directory.

## Deployment

The easiest way to deploy this portfolio is using Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

## Performance Optimization

- Images are optimized for different screen sizes
- Animations are optimized for performance
- Code splitting and lazy loading implemented
- Static generation used where possible

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Miloš Minić - minicm034@gmail.com

Portfolio Link: [https://milosminic.dev](https://milosminic.net)

## Acknowledgments

- Design inspired by GitHub's interface
- Particle animation inspired by various open-source projects
- Icons provided by Lucide Icons
