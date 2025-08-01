import React from 'react';
import './styles.css';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="tag">
      {text}
    </span>
  );
};

export default Tag;