import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote, NewBut, NewButEnd } from "./styles";
import { useState, useEffect } from "react";
import { api } from "../../service/api";
import { useNavigate, Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);



  const navigate = useNavigate();


  function handleTagSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);

    } else {
      setTagsSelected(prevState => [...prevState, tagName])
    }

  }
  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags');
      setTags(response.data);
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }
    fetchNotes();
  }, [tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>Projeto Notas</h1>
      </Brand>

      <Header></Header>

      <Menu>

        <li><ButtonText
          $isActive={tagsSelected.length === 0}
          title="Todos"
          onClick={() => handleTagSelected('all')}
        />
        </li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                $isActive={tagsSelected.includes(tag.name)}
                onClick={() => handleTagSelected(tag.name)}
              />
            </li>
          ))
        }

      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
          icon={FiSearch} />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>
      <div>

        <NewBut
          to="/cars">
          Cars
        </NewBut>

        <NewButEnd
          to="/endereco">
          Endereço
        </NewButEnd>

        <NewNote to="/new">
          <FiPlus></FiPlus>
          Criar Nota
        </NewNote>
      </div>
    </Container>
  );
}
