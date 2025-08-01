import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import { LinkItem, LinkFormMode } from './types/index.tsx';
import LinkForm from './components/LinkForm/index.tsx';
import LinkList from './components/LinkList/index.tsx';
import SearchBar from './components/SearchBar/index.tsx';
import './App.css';


const App = () => {
  const [links, setLinks] = useLocalStorage<LinkItem[]>('links', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredLinks = links.filter(link => {
    const term = searchTerm.toLowerCase();
    return (
      link.title.toLowerCase().includes(term) ||
      link.url.toLowerCase().includes(term) ||
      link.description.toLowerCase().includes(term) ||
      link.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  const handleAddLink = (newLink: Omit<LinkItem, 'id'>) => {
    setLinks([...links, { ...newLink, id: crypto.randomUUID(), createdAt: Date.now() }]);
    setIsFormOpen(false);
  };

  const handleUpdateLink = (updatedLink: Omit<LinkItem, 'id'>) => {
    setLinks(links.map(link => 
      link.id === editingId ? { ...updatedLink, id: editingId, createdAt: link.createdAt } : link
    ));
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDeleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔗 React Links Vault</h1>
        <button 
          className="add-button"
          onClick={() => {
            setEditingId(null);
            setIsFormOpen(true);
          }}
        >
          + Add Link
        </button>
      </header>

      <main className="app-main">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        
        {isFormOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <LinkForm
                initialData={editingId ? links.find(link => link.id === editingId) : undefined}
                onSubmit={editingId ? handleUpdateLink : handleAddLink}
                onCancel={() => setIsFormOpen(false)}
              />
            </div>
          </div>
        )}

        <LinkList 
          links={filteredLinks} 
          onEdit={setEditingId} 
          onDelete={handleDeleteLink} 
        />
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} React Links Vault</p>
      </footer>
    </div>
  );
};

export default App;