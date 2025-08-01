import { validateLinkForm } from '../../utils/validation.ts';
import React, { useState, useEffect } from 'react';
import { LinkItem, LinkFormMode } from '../../types';
import './styles.css';



interface LinkFormProps {
  initialData?: Omit<LinkItem, 'id' | 'createdAt'>;
  onSubmit: (data: Omit<LinkItem, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<LinkItem, 'id' | 'createdAt'>>({
    title: '',
    url: '',
    description: '',
    tags: [],
    ...initialData
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLinkForm(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{initialData ? 'Edit Link' : 'Add New Link'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="url">URL*</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          rows={3}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="react, typescript, tutorial"
          className="form-input"
        />
      </div>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-message">⚠️ {error}</p>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          {initialData ? 'Update Link' : 'Save Link'}
        </button>
      </div>
    </form>
  );
};

export default LinkForm;