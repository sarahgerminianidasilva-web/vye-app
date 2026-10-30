# Voice Your English · app

App web instalável (PWA) para alunos e para a teacher.

- **Alunos** entram com o e-mail (link ou código enviado por e-mail, sem senha) e veem só o próprio painel.
- **Teacher** (e-mail na tabela `teachers`) vê todos os alunos, as novidades (lições feitas, comprovantes, autoavaliações), edita qualquer painel e cadastra alunos.

## Arquivos
- `index.html`, `app.js`, `app.css`: casca do app (login, área da teacher, envios).
- `panel.js`, `panel.css`: painel do aluno, gerado de `claudinei-dashboard.html` por `build/make_panel.py`.
- `template.json`: dados iniciais de um aluno novo.
- `config.js`: URL e chave pública (anon) do Supabase.
- `supabase/schema.sql`: tabelas, regras de acesso (RLS) e armazenamento.

## Dados (Supabase)
- `students(id, email, name, data jsonb, active)`: `data` tem o mesmo formato do painel (lessons, homework, payments…).
- `progress(student_id, data jsonb)`: estado do aluno (sequência, checklist, lições feitas, respostas).
- `submissions(student_id, kind, ref, payload, file_path, seen)`: `kind` = homework | payment | selfeval | message.
- Storage: `receipts` (privado, comprovantes) e `materials` (público, arquivos de lição).

## Atualizar um painel por SQL (automação)
```sql
update public.students set data = data || '{"lessons":[...],"homework":[...]}'::jsonb where name = 'Claudinei';
```

## Agenda e controle de aulas (teacher)
- `board.js`: card de agenda na tela inicial da teacher e páginas `#/controle` (lista) e `#/controle/<id>` (ficha com aulas recentes e histórico).
- Dados em `teacher_board(id=1, data jsonb)`, só a teacher lê e escreve (RLS). Formato: `{A:[alunos com slots, aulas…], HIST:{id:[[data,título,status,obs]]}, EXTRAS:[reposições], updated}`.
