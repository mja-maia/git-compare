import React, { useState } from 'react';
import moment from 'moment';
import { Container, Form } from './styles';
import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';
import api from '../../services/api';

const Main = () => {
  const [repositories, setRepositories] = useState([]);
  const [repositoryInput, setRepositoryInput] = useState('');
  const [repositoryError, setRepositoryError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddRepository = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: repository } = await api.get(`repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      setRepositoryInput('');
      setRepositories([...repositories, repository]);
      setRepositoryError(false);
    } catch (err) {
      setRepositoryError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <img width="200" src={logo} alt="Github Compare" />
      <Form withError={repositoryError} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="usuário/repositório"
          value={repositoryInput}
          onChange={e => setRepositoryInput(e.target.value)}
        />
        <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
      </Form>
      <CompareList repositories={repositories} />
    </Container>
  );
};

export default Main;
