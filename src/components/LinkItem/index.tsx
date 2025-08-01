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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(link.url, '_blank');
  };

  return (
    <div className="link-card">
      <div className="link-header">
        <h3 onClick={handleClick}>{link.title}</h3>
        <div className="link-actions">
          <button 
            className="edit-btn" 
            onClick={() => onEdit(link.id)}
          >
            Edit
          </button>
          <button 
            className="delete-btn" 
            onClick={() => onDelete(link.id)}
          >
            Delete
          </button>
        </div>
      </div>
      
      <a href={link.url} className="link-url" target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>
      
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
        <span className="link-date">
          Added: {new Date(link.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default LinkItem;