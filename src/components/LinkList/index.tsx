import React from 'react';
import { LinkItem } from '../../types';
import LinkItemComponent from '../LinkItem/index.tsx';
import './styles.css';

interface LinkListProps {
  links: LinkItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  if (links.length === 0) {
    return (
      <div className="empty-state">
        <p>No links saved yet. Add your first link to get started!</p>
      </div>
    );
  }

  return (
    <div className="links-grid">
      {links.map(link => (
        <LinkItemComponent
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LinkList;