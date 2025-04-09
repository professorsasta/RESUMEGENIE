import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

interface Experience {
  company: string;
  title: string;
  dates: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string;
  link?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

interface Achievement {
  title: string;
  date: string;
  description: string;
}

interface Activity {
  title: string;
  organization: string;
  date: string;
  description: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Style {
  colorScheme: string;
  fontFamily: string;
  fontSize: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  activities: Activity[];
  languages: Language[];
  hobbies: string[];
  technicalSkills: string[];
  softSkills: string[];
  style: Style;
}

const API_BASE_URL = 'http://localhost:5000';

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
  const [newSkill, setNewSkill] = useState('');
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', dates: '', description: '' }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_: string, i: number) => i !== index)
    }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', graduationDate: '', gpa: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleStyleChange = (field: keyof typeof formData.style, value: string) => {
    setFormData(prev => ({
      ...prev,
      style: {
        ...prev.style,
        [field]: value
      }
    }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setFormData(prev => ({ ...prev, certifications: newCertifications }));
  };

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
    const newActivities = [...formData.activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setFormData(prev => ({ ...prev, activities: newActivities }));
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, languages: newLanguages }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', technologies: '' }]
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { name: '', issuer: '', date: '' }]
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', date: '', description: '' }]
    }));
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, { title: '', organization: '', date: '', description: '' }]
    }));
  };

  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [...prev.languages, { name: '', proficiency: '' }]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const removeActivity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setDownloadUrl('');

    try {
      console.log('Sending request to:', `${API_BASE_URL}/generate`);
      console.log('Request data:', formData);
      
      const response = await axios.post(`${API_BASE_URL}/generate`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response received:', response.data);
      
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
      console.error('Error details:', err);
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
      const response = await axios.get(downloadUrl, {
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
        <Card className="mb-4">
          <Card.Header>Resume Styling</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Color Scheme</Form.Label>
                  <Form.Select
                    value={formData.style.colorScheme}
                    onChange={(e) => handleStyleChange('colorScheme', e.target.value)}
                  >
                    <option value="classic">Classic (Dark Blue)</option>
                    <option value="modern">Modern (Teal)</option>
                    <option value="professional">Professional (Maroon)</option>
                    <option value="elegant">Elegant (Gray)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Font Style</Form.Label>
                  <Form.Select
                    value={formData.style.fontFamily}
                    onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
                  >
                    <option value="Calibri">Calibri</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Garamond">Garamond</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Font Size</Form.Label>
                  <Form.Select
                    value={formData.style.fontSize}
                    onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Professional Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skills</Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <Button variant="secondary" onClick={handleAddSkill} className="ms-2">
              Add
            </Button>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {formData.skills.map((skill: string, index: number) => (
              <span key={index} className="badge bg-primary">
                {skill}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  aria-label="Remove"
                  onClick={() => handleRemoveSkill(index)}
                />
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Experience</Form.Label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dates</Form.Label>
                    <Form.Control
                      type="text"
                      value={exp.dates}
                      onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeExperience(index)}
                disabled={formData.experience.length === 1}
              >
                Remove Experience
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addExperience} className="mt-2">
            Add Experience
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Education</Form.Label>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>School/University</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Degree/Certificate</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Graduation Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>GPA (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {formData.education.length > 1 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="mt-2"
                >
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline-primary"
            onClick={addEducation}
            className="mt-2"
          >
            Add Education
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Projects</Form.Label>
          {formData.projects.map((project, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Technologies</Form.Label>
                    <Form.Control
                      type="text"
                      value={project.technologies}
                      onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeProject(index)}
                disabled={formData.projects.length === 1}
              >
                Remove Project
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addProject} className="mt-2">
            Add Project
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Certifications</Form.Label>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Issuer</Form.Label>
                    <Form.Control
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeCertification(index)}
                disabled={formData.certifications.length === 1}
              >
                Remove Certification
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addCertification} className="mt-2">
            Add Certification
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Achievements</Form.Label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeAchievement(index)}
                disabled={formData.achievements.length === 1}
              >
                Remove Achievement
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addAchievement} className="mt-2">
            Add Achievement
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Activities</Form.Label>
          {formData.activities.map((activity, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={activity.title}
                      onChange={(e) => handleActivityChange(index, 'title', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Organization</Form.Label>
                    <Form.Control
                      type="text"
                      value={activity.organization}
                      onChange={(e) => handleActivityChange(index, 'organization', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={activity.date}
                      onChange={(e) => handleActivityChange(index, 'date', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={activity.description}
                  onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeActivity(index)}
                disabled={formData.activities.length === 1}
              >
                Remove Activity
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addActivity} className="mt-2">
            Add Activity
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Languages</Form.Label>
          {formData.languages.map((language, index) => (
            <div key={index} className="border p-3 mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={language.name}
                      onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Proficiency</Form.Label>
                    <Form.Control
                      type="text"
                      value={language.proficiency}
                      onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeLanguage(index)}
                disabled={formData.languages.length === 1}
              >
                Remove Language
              </Button>
            </div>
          ))}
          <Button variant="secondary" onClick={addLanguage} className="mt-2">
            Add Language
          </Button>
        </Form.Group>

        <div className="mt-4 d-flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Resume'}
          </Button>
          {downloadUrl && (
            <Button
              variant="success"
              onClick={handleDownload}
              disabled={loading}
            >
              Download Resume
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default ResumeForm; 