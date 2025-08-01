import React from 'react';
import { LinkItem as LinkItemType } from '../../types'; // Renamed import
import Tag from '../Tag/index.tsx';
import './styles.css';



interface LinkItemProps {
  link: LinkItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onEdit, onDelete }) => {
  return (
    <div className="link-card">
      <div className="link-header">
        <h3>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </a>
        </h3>
        <div className="link-actions">
          <button className="edit-btn" onClick={() => onEdit(link.id)}>✏️</button>
          <button className="delete-btn" onClick={() => onDelete(link.id)}>🗑️</button>
        </div>
      </div>
      
      <p className="link-url">{link.url}</p>
      
      {link.description && (
        <p className="link-description">{link.description}</p>
      )}
      
      {link.tags.length > 0 && (
        <div className="tags-container">
          {link.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      )}
      
      <div className="link-footer">
        <span>Added: {new Date(link.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default LinkItem;