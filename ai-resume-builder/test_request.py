import requests
import json

def test_request():
    url = 'http://localhost:8080/generate-resume'
    data = {
        'name': 'John Doe',
        'summary': 'Experienced software developer with 5 years of expertise in full-stack development, specializing in Python and JavaScript. Strong focus on building scalable web applications and implementing efficient solutions.',
        'skills': ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'AWS'],
        'experience': 'Senior Software Developer at Tech Corp (2020-2024): Led development of enterprise applications, managed a team of 4 developers, and implemented CI/CD pipelines. Reduced deployment time by 60% and improved application performance by 40%.'
    }
    
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == '__main__':
    test_request() 