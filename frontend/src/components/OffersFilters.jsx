import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import '../styles/OffersFilters.css';

const OffersFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    contractTypes: [],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const contractOptions = [
    { id: 'CDI', label: 'CDI' },
    { id: 'Stage', label: 'Stage' },
    { id: 'Alternance', label: 'Alternance' },
    { id: 'Freelance', label: 'Freelance' },
  ];

  // Gestion du clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newTypes;
    if (checked) {
      newTypes = [...filters.contractTypes, value];
    } else {
      newTypes = filters.contractTypes.filter((t) => t !== value);
    }
    const newFilters = { ...filters, contractTypes: newTypes };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // --- OPTIMISATION : Fonction de rendu réutilisable ---
  // On passe un 'prefixId' ('mob' ou 'desk') pour garantir des clés uniques React
  const renderContractList = (prefixId) => (
    <div className='filter__checkbox-list'>
      {contractOptions.map((option) => (
        <label key={`${prefixId}-${option.id}`} className='checkbox-item'>
          <input
            type='checkbox'
            value={option.id}
            checked={filters.contractTypes.includes(option.id)}
            onChange={handleCheckboxChange}
          />
          <span style={{ marginLeft: '8px' }}>{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className='filter' onSubmit={handleSubmit}>
      {/* 1. RECHERCHE */}
      <div className='filter__search'>
        <label className='filter__label' htmlFor="keyword">Recherche par mots-clés</label>
        <i className='fa-solid fa-magnifying-glass input-icon filter__icon'></i>
        <input
          type='text'
          name='keyword'
          id='keyword'
          placeholder='Poste, mot-clé'
          value={filters.keyword}
          onChange={handleInputChange}
          className='filter__input'
        />
      </div>

      {/* 2. LOCALISATION */}
      <div className='filter__search'>
        <label className='filter__label' htmlFor="location">Recherche par ville</label>
        <i className='fa-solid fa-location-dot input-icon filter__icon'></i>
        <input
          type='text'
          name='location'
          id='location'
          placeholder='Ville'
          value={filters.location}
          onChange={handleInputChange}
          className='filter__input'
        />
      </div>

      {/* 3. SECTION CONTRATS */}
      <div className='filter__dropdown-wrapper' ref={dropdownRef}>
        
        {/* === VERSION MOBILE === */}
        <div className='filter__mobile-view'>
          <Button
            text='Contrat'
            bgColor='var(--color-secondary)'
            textColor='#ffffff'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            fullWidth={false}
            icon={
              <i className={`fa-solid fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
            }
          />

          {isDropdownOpen && (
            <div className='filter__dropdown-menu'>
              {/* Appel de la fonction réutilisable avec le préfixe 'mob' */}
              {renderContractList('mob')}
            </div>
          )}
        </div>

        {/* === VERSION DESKTOP === */}
        <div className='filter__desktop-view'>
          <label className='filter__label'>Type de contrat</label>
          {/* Appel de la fonction réutilisable avec le préfixe 'desk' */}
          {renderContractList('desk')}
        </div>

      </div>
    </div>
  );
};

export default OffersFilters;