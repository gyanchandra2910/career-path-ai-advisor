import React, { useState, useRef } from 'react';

const TagInput = ({ 
  tags = [], 
  onChange, 
  placeholder = "Type and press Enter or comma to add...",
  className = "",
  maxTags = null,
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTag = (tagValue) => {
    const trimmedValue = tagValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      if (maxTags && tags.length >= maxTags) {
        return;
      }
      const newTags = [...tags, trimmedValue];
      onChange(newTags);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      const newTags = tags.slice(0, -1);
      onChange(newTags);
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags);
  };

  const handleContainerClick = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`
        min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-md 
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
        bg-white cursor-text flex flex-wrap items-center gap-2
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={handleContainerClick}
    >
      {/* Render existing tags */}
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none focus:bg-blue-200"
              aria-label={`Remove ${tag}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </span>
      ))}
      
      {/* Input field */}
      {(!maxTags || tags.length < maxTags) && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 placeholder-gray-500 disabled:cursor-not-allowed"
        />
      )}
      
      {/* Max tags reached indicator */}
      {maxTags && tags.length >= maxTags && (
        <span className="text-xs text-gray-500 px-2">
          Max {maxTags} tags
        </span>
      )}
    </div>
  );
};

export default TagInput;
