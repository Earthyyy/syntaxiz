<div id="readme-top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Syntaxiz</h3>

  <p align="center">
    Convert your Python Abstract Syntax Tree to Assembly code

  </p>
</div>

<p align="center">
  <a href="#overview">Overview</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#built-with">Built With</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Installation</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#roadmap">Roadmap</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contributing">Contributing</a>

</p>

## Overview

[![Syntaxiz][product-screenshot]](https://github.com/Earthyyy/syntaxiz)

This project is actually an assignment for the course "Compilation" at The National Institute of Statistics and Applied economies. This project aims to enhance user experience through the implementation of a user-friendly Drag and Drop playground. We are trying to allow the user to build an Abstract Syntax Tree easily and then convert it to Assembly code.

The convention used for the Abstract Syntax Tree is based on a simplified version of the Python AST. The AST is built using the [Python AST module](https://docs.python.org/3/library/ast.html) and then converted to a JSON object. The JSON object is then sent to the backend to be converted to Assembly code.

The project is still under development, and may be extended later to a series of other mini "Compiler" projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

- [NextJS](https://nextjs.org/) - For the frontend & Backend
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Shadcn](https://ui.shadcn.com/) - for UI Components
- [Tanstack Query](https://tanstack.com/query/) - for API calls
- [React Flow](https://reactflow.dev/) - for tree visualization
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - for state management

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Earthyyy/syntaxiz
   ```
2. Navigate to the project directory
   ```sh
   cd syntaxiz
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run the dev server
   ```sh
    npm run dev
   ```
5. Navigate to [http://localhost:3000](http://localhost:3000)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add backend logic to convert the AST to Assembly code
- [x] Add a Drag and Drop Section
- [x] Add a tree visualization
- [x] Add output section
- [x] Add Dark Mode
- [ ] Eliminate JS code
- [ ] Add support to Docker
- [ ] Add support to `for` and `function calls` statements
- [ ] Implement AutoLayout mechanism (Optional)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Embracing collaboration is what fuels the heartbeat of the open-source community. Your contributions are not just welcomed but cherished.

Should you have ideas for improvement, we invite you to fork the repository and initiate a pull request. Alternatively, feel free to open an issue, labeled 'enhancement,' to share your insights.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/new-feature-name`)
3. Commit your Changes (`git commit -m 'feat: add some new feature'`)
4. Push to the Branch (`git push origin feat/new-feature-name`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/demo.gif
