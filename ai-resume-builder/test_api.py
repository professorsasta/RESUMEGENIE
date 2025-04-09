import requests
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_api():
    base_url = 'http://localhost:8080'
    
    # Test 1: Basic endpoint
    logger.info("Testing /test endpoint...")
    response = requests.get(f'{base_url}/test')
    assert response.status_code == 200
    assert response.json()['message'] == "API is working!"
    
    # Test 2: Input validation
    logger.info("\nTesting input validation...")
    invalid_data = {
        'summary': 'Test summary',
        'skills': ['Python', 'JavaScript'],
        'experience': 'Test experience'
        # Missing 'name' field
    }
    response = requests.post(f'{base_url}/generate-resume', json=invalid_data)
    logger.info(f"Validation test response (should fail): {response.status_code}")
    logger.info(f"Error message: {response.json()}")
    
    # Test 3: Resume generation
    logger.info("\nTesting resume generation with valid data...")
    valid_data = {
        'name': 'John Doe',
        'email': 'john@example.com',
        'phone': '123-456-7890',
        'location': 'New York, NY',
        'summary': 'Experienced software developer with 5+ years in web development',
        'skills': ['Python', 'JavaScript', 'React', 'Node.js', 'SQL'],
        'experience': '''
        Senior Software Developer at Tech Corp (2020-Present)
        - Led development of enterprise applications
        - Managed team of 5 developers
        - Implemented CI/CD pipeline
        '''
    }
    response = requests.post(f'{base_url}/generate-resume', json=valid_data)
    logger.info(f"Response status: {response.status_code}")
    logger.info("Generated content preview:")
    logger.info(response.json().get('content', '')[:100] + '...')
    
    # Test 4: Resume download
    logger.info("\nTesting resume download...")
    response = requests.get(f'{base_url}/download-resume')
    if response.status_code == 200:
        with open('downloaded_resume.docx', 'wb') as f:
            f.write(response.content)
        logger.info("Resume downloaded successfully!")
    else:
        logger.error(f"Failed to download resume: {response.status_code}")

if __name__ == '__main__':
    test_api() 