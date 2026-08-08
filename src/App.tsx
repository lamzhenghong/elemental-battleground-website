const chapters = [
  { id: 'world', title: 'Enter the World' },
  { id: 'combat', title: 'Combat Without Hesitation' },
  { id: 'heroes', title: 'Four Limited Legends' },
  { id: 'special-ultimates', title: 'Special Ultimates' },
  { id: 'modes', title: 'Choose the Trial' },
  { id: 'progression', title: 'Build Your Answer' },
  { id: 'play', title: 'Enter the Battleground' }
] as const;

export function App() {
  return (
    <>
      <main>
        <section id="overview">
          <h1>Elemental Battleground</h1>
        </section>
        {chapters.map(chapter => (
          <section id={chapter.id} key={chapter.id}>
            <h2>{chapter.title}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
