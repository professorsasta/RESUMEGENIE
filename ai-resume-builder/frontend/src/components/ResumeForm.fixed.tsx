import React, { useState, FormEvent } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import { FormData, Experience, Education, Project, Certification, Achievement, Activity, Language, Style, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ResumeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    skills: [],
    experience: [{
      title: '',
      company: '',
      dates: '',
      description: ''
    }],
    education: [{
      school: '',
      degree: '',
      graduationDate: '',
      gpa: ''
    }],
    projects: [{
      title: '',
      description: '',
      technologies: ''
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: ''
    }],
    achievements: [{
      title: '',
      date: '',
      description: ''
    }],
    activities: [{
      title: '',
      organization: '',
      date: '',
      description: ''
    }],
    languages: [{
      name: '',
      proficiency: ''
    }],
    hobbies: [],
    technicalSkills: [],
    softSkills: [],
    style: {
      colorScheme: 'classic',
      fontFamily: 'Calibri',
      fontSize: 'normal'
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [newSkill, setNewSkill] = useState<string>('');
  const [newTechnicalSkill, setNewTechnicalSkill] = useState<string>('');
  const [newSoftSkill, setNewSoftSkill] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setDownloadUrl('');

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/generate`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message) {
        setSuccess(true);
        if (response.data.downloadUrl) {
          setDownloadUrl(`${API_BASE_URL}${response.data.downloadUrl}`);
        } else {
          setDownloadUrl(`${API_BASE_URL}/download`);
        }
      } else {
        setError(response.data.error || 'Failed to generate resume');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`);
        } else if (err.request) {
          setError('No response from server. Please check if the backend is running.');
        } else {
          setError(`Request error: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!downloadUrl) {
      setError('No resume available for download');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<Blob>(downloadUrl, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.docx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">RESUMEGENIE</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Resume generated successfully!
          <Button
            variant="link"
            onClick={handleDownload}
            disabled={loading || !downloadUrl}
            className="ms-2"
          >
            Download Resume
          </Button>
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        {/* Form content */}
      </Form>
    </Container>
  );
};

export default ResumeForm; 