import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Component
 * Propriedades
 * Estados
 */

export default function App() {
    // const projects = ['Desenvolvimento de app', 'Front-end web'];
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(({ data }) => {
            setProjects(data)
        })
    }, []);

    async function handleAddProject() {
        // projects.push(`Novo projeto ${Date.now()}`);

        // setProjects([...projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: 'Back-end com node',
            owner: 'Nicolas Nathan',
         });

         const project = response.data;
         setProjects([...projects, project]);
        console.log(projects);
    }
    return (
        <>
            {/* <Header title="Homepage">
                <ul>
                    <li>Homepage</li>
                    <li>Projects</li>
                    <li>Products</li>
                </ul>
            </Header> */}
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}