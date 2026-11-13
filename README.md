# Portifólio LLK

Portfólio profissional de Lucas, reunindo projetos de sites, landing pages, CRM, marketing e estrutura comercial digital.

## IA aplicada e evidências

A seção `#evidencias`, acessível pela abertura do site, apresenta prompts estruturados, experiência com LLMs e IA local, automações, ferramentas publicadas, dashboards/agentes e resultados com contexto.

- `CASEBOOK.md` registra a base de cada case e os dados necessários para ampliar sua comprovação.
- `portfolio-assets/lab/` contém o prompt completo e o protocolo de avaliação em português e inglês, disponíveis para download na página.
- `evidence.css` e `evidence.js` cuidam da apresentação e das interações da seção.
- `languages.js` traduz o conteúdo em `?lang=en`; os downloads e os cálculos acompanham o idioma.

A economia de tempo é uma simulação editável, e o protocolo de LLM é demonstrativo. O retorno comercial informado é agregado e não é atribuído a um modelo, CRM ou automação isolados. Para substituir estimativas por resultados medidos, seguir os critérios do caderno de cases.

## Projetos apresentados

- [MVPLLK, case técnico](https://lucasluk.vercel.app/projetos/mvpllk)

- [Vinícius Mozzer — Essence Residence](https://viniciusmozzer.com.br/)
- [Vini Imóveis CRM](https://crm.viniciusmozzer.com.br/)
- [Imobiliária San Martins](https://imobmartins.vercel.app/)
- [FIT Global — Rudy Daniel](https://rudydaniel.com.br/)
- [Golden Brasil](https://goldenbrasil.com.br/novo/)
- [Guímel Roeher](https://guimelroeher.vercel.app/)

## Executar localmente

O portfólio mantém HTML, CSS e JavaScript estáticos. As páginas novas ficam em `ia/index.html` e `projetos/mvpllk/index.html`; `vercel.json` serve as URLs sem extensão na Vercel. O servidor local simples pode acrescentar uma barra ao final dessas URLs.

A página inicial apresenta os projetos após a abertura, com objetivo, construção e links individuais. `home.css` organiza a grade e as seções complementares; o vídeo do CRM, os exemplos de IA, o repertório e o FAQ usam painéis expansíveis. A rota `/ia` reúne trajetória, competências, projetos técnicos e metodologia. O laboratório de RAG está identificado como proposta na seção `/ia#laboratorio`. Os dois idiomas usam `languages.js`; `site.js` mantém idioma entre rotas, filtros, links diretos e ano do rodapé.

O projeto é estático. Inicie um servidor local na raiz do repositório:

```powershell
python -m http.server 8000
```

Depois, abra `http://localhost:8000`.
