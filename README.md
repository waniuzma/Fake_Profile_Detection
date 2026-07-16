# Fake Profile Detection System

## About the Project

Fake Instagram accounts are commonly used for spam, impersonation, scams, and spreading misinformation. The purpose of this project is to develop a machine learning application that can identify whether an Instagram profile is genuine or fake based on its profile characteristics.

The application accepts profile information from the user, processes it using a trained machine learning model, and predicts whether the account is **Real** or **Fake**.

This project was developed as an academic machine learning project to demonstrate the practical use of classification algorithms in solving real-world cybersecurity problems.


## Features

- Detects fake Instagram profiles using Machine Learning
- Simple and interactive web interface
- Fast prediction using a trained model
- REST API built with FastAPI
- React-based frontend
- Easy to extend with new features and datasets


## Technology Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- FastAPI
- Python

### Machine Learning
- Scikit-learn
- Pandas
- NumPy
- Joblib

## Dataset

The model is trained using an Instagram fake profile dataset containing various profile attributes, including:

- Profile picture
- Username length
- Full name words
- Bio description length
- External URL
- Private account
- Number of posts
- Number of followers
- Number of following

These features are used to classify profiles into:

- Real Profile
- Fake Profile


## Project Structure

Fake_Profile_Detection
│
├── backend
├── frontend
├── notebook
└── README.md

## How the System Works

1. The user enters Instagram profile information.
2. The frontend sends the data to the FastAPI backend.
3. The backend loads the trained machine learning model.
4. The model predicts whether the profile is real or fake.
5. The prediction is displayed on the screen.


## Installation

### Clone the repository

bash
git clone https://github.com/waniuzma/Fake_Profile_Detection.git


### Backend

bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
bash
cd frontend
npm install
npm run dev

## Future Scope

Some possible improvements include:

- Training on larger and more recent datasets
- Supporting additional social media platforms
- Improving prediction accuracy
- Deploying the application online
- Adding user authentication and prediction history



This project is developed for educational and learning purposes.
