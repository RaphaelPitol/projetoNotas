import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteIten";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { Container, Form } from "./styles";



export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));

  }


  function handleAddTag() {
    setTags(prevState => [...prevState, newTags]);
    setNewTags("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {

    if(!title){
      return alert ("Digite o Titulo da Nota!")
    }
    if(newLink){
      return alert ("Voce deixou um link no campo para adicionar, mas não clicou em adicionar."+
      "Click para adicionar ou deixe o campo vazio")
    }
    if(newTags){
      return alert ("Voce deixou uma tag no campo para adicionar, mas não clicou em adicionar."+
      "Click para adicionar ou deixe o campo vazio")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    navigate("/");
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar Nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Titulo"
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="links úteis">
            <NoteItem
              isnew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />

            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}

                />
              ))

            }
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              <NoteItem
                isnew
                placeholder="Nova tag"
                value={newTags}
                onChange={e => setNewTags(e.target.value)}
                onClick={handleAddTag}
              />
              {
                tags.map((tags, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tags}
                    onClick={() => handleRemoveTag(tags)}

                  />

                ))
              }

            </div>
          </Section>

          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  );
}
