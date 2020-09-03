import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RespositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}


interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }

}
//usar sempre nesse formado, pois pode definir o formato da variavel
const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {
        api.get(`/repos/${params.repository}`).then((response) => {
            setRepository(response.data);
        });

        api.get(`/repos/${params.repository}/issues`).then((response) => {
            setIssues(response.data);
        });

        //ou
        //usar esse momento, para executar as duas ou mais, sem depender uma da outra
        // async function loadData(): Promise<void>{
        //     const [ repository, issues ] = await Promise.all([
        //         api.get(`/repos/${params.repository}`),
        //         api.get(`/repos/${params.repository}/issues`)
        //     ]);
        // }

        // loadData();
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                Voltar
            </Link>
            </Header>

            {repository && <RespositoryInfo>
                <header>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login} />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>

                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>

                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RespositoryInfo>
            }

            <Issues>
              {issues.map(issue => (
                    <a key={issue.id} href={issue.html_url}>
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>
              ))}
            </Issues>
        </>
    )
}

export default Repository;