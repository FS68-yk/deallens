import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { mockProjects } from '../data/mockData';
import { Project, Document } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface AppContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  uploadDocument: (file: File, projectId?: string) => Promise<void>;
  createProjectFromExtractedData: (extractedData: any, files: File[]) => void;
  activeFilters: {
    industry: string[];
    stage: string[];
    valuation: string[];
  };
  toggleFilter: (type: 'industry' | 'stage' | 'valuation', value: string) => void;
  clearFilters: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const defaultContextValue: AppContextType = {
  projects: [],
  addProject: () => {},
  uploadDocument: async () => {},
  createProjectFromExtractedData: () => {},
  activeFilters: {
    industry: [],
    stage: [],
    valuation: [],
  },
  toggleFilter: () => {},
  clearFilters: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    stage: [],
    valuation: [],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [...prev, project]);
  }, []);

  const uploadDocument = useCallback(async (file: File, projectId?: string): Promise<void> => {
    // Simulating document upload and processing
    return new Promise((resolve) => {
      setTimeout(() => {
        if (projectId) {
          // Add document to existing project
          setProjects((prev) =>
            prev.map((p) => {
              if (p.id === projectId) {
                return {
                  ...p,
                  documents: [...p.documents, {
                    id: `doc-${Date.now()}`,
                    name: file.name,
                    type: file.type,
                    uploadDate: new Date().toISOString(),
                    size: file.size,
                    url: URL.createObjectURL(file),
                  }],
                };
              }
              return p;
            })
          );
        } else {
          // Create new project from document (in a real app, this would extract info from the document)
          const newProject: Project = {
            id: `proj-${Date.now()}`,
            name: file.name.split('.')[0],
            industry: 'Technology', // Default values that would be extracted by AI
            stage: 'Seed',
            valuation: '$1-5M',
            description: 'Auto-generated project from uploaded document',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            founders: [{ name: 'TBD', role: 'Founder', background: 'To be extracted' }],
            documents: [{
              id: `doc-${Date.now()}`,
              name: file.name,
              type: file.type,
              uploadDate: new Date().toISOString(),
              size: file.size,
              url: URL.createObjectURL(file),
            }],
            tags: ['new', 'uploaded'],
            financials: {
              revenueGrowth: 0,
              burn: 0,
              runway: 0,
              previousRound: {
                date: null,
                amount: 0,
                valuation: 0,
                investors: [],
              },
            },
          };
          
          addProject(newProject);
        }
        resolve();
      }, 1500);
    });
  }, [addProject]);

  const createProjectFromExtractedData = useCallback((extractedData: any, files: File[]) => {
    // Take the data extracted by AI and create a new project
    const documents: Document[] = files.map(file => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      type: file.type,
      uploadDate: new Date().toISOString(),
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    // Create new project 
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: extractedData.projectName || files[0].name.split('.')[0],
      industry: extractedData.industry || 'Technology',
      stage: extractedData.stage || 'Seed',
      valuation: extractedData.valuation || '$1-5M',
      description: extractedData.description || 'AI-generated project description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      founders: extractedData.founders || [{ name: 'TBD', role: 'Founder', background: 'To be extracted' }],
      documents: documents,
      tags: extractedData.tags || ['AI Generated', 'New'],
      financials: extractedData.financials || {
        revenueGrowth: 0,
        burn: 0,
        runway: 0,
        previousRound: {
          date: null,
          amount: 0,
          valuation: 0,
          investors: [],
        },
      },
      logo: extractedData.logo || undefined,
      website: extractedData.website || undefined,
      location: extractedData.location || undefined,
      competitors: extractedData.competitors || [],
      isNew: true,
    };
    
    // Add the new project to the list
    addProject(newProject);
  }, [addProject]);

  const toggleFilter = useCallback((type: 'industry' | 'stage' | 'valuation', value: string) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[type]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: currentFilters,
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      industry: [],
      stage: [],
      valuation: [],
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    projects, 
    addProject, 
    uploadDocument,
    createProjectFromExtractedData,
    activeFilters, 
    toggleFilter, 
    clearFilters,
    searchTerm,
    setSearchTerm
  }), [
    projects, 
    addProject, 
    uploadDocument,
    createProjectFromExtractedData,
    activeFilters, 
    toggleFilter, 
    clearFilters,
    searchTerm
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};