export interface Experience {
  company: string;
  title: string;
  dates: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
}

export interface Activity {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Style {
  colorScheme: string;
  fontFamily: string;
  fontSize: string;
}

export interface FormData {
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

export interface ApiResponse {
  message?: string;
  error?: string;
  downloadUrl?: string;
} 