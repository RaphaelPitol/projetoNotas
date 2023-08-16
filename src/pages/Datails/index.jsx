import { Container, Links, Content } from "./style";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

export function Details() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const params = useParams();


  function handleBack() {
    navigate("/");
  }

  async function handleRemoveNote() {
    const confirm = window.confirm('Deseja realmente?')

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      handleBack()
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, [])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemoveNote}
            />

            <h1> {data.title}</h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url}>{link.url}</a>
                      </li>

                    ))
                  }
                </Links>
              </Section>
            }
            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)}
                      title={tag.name}>

                    </Tag>
                  ))
                }

              </Section>
            }

            <Button
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>

      }
    </Container>
  );
}
