# AI-Powered Resume Builder

A modern web application that helps users create professional resumes with customizable styling options. Built with React, Flask, and Python.

![Resume Builder Demo](demo.gif)

## Features

- **User-Friendly Interface**: Clean and intuitive form for entering resume details
- **Customizable Styling**:
  - Multiple color schemes (Classic, Modern, Professional, Elegant)
  - Various font options (Calibri, Arial, Times New Roman, Garamond)
  - Adjustable font sizes
- **Comprehensive Sections**:
  - Personal Information
  - Professional Summary
  - Technical Skills
  - Professional Experience
  - Education
- **Instant Download**: Generate and download your resume in DOCX format
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Flask, Python
- **Document Generation**: python-docx
- **Styling**: Custom CSS with Bootstrap

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Start the development servers:
```bash
# Terminal 1 - Backend
cd ai-resume-builder
python app.py

# Terminal 2 - Frontend
cd frontend
npm start
```

5. Access the application at `http://localhost:3000`

## Usage

1. Fill in your personal and professional details
2. Choose your preferred styling options
3. Click "Generate Resume"
4. Download your professionally formatted resume

## Project Structure

```
ai-resume-builder/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── App.tsx      # Main application
│   │   └── index.tsx    # Entry point
│   └── package.json     # Node.js dependencies
└── README.md            # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) for the frontend framework
- [Flask](https://flask.palletsprojects.com/) for the backend framework
- [python-docx](https://python-docx.readthedocs.io/) for document generation
- [Bootstrap](https://getbootstrap.com/) for UI components

## Contact

For any questions or suggestions, please feel free to reach out:

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername) 