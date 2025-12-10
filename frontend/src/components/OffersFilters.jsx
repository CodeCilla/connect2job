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

  // Gestion du clic extérieur (pour fermer le dropdown mobile)
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

  return (
    <form className='filter' onSubmit={handleSubmit}>
      {/* 1. RECHERCHE */}
      <div className='filter__search'>
        <i className='fa-solid fa-magnifying-glass input-icon filter__icon'></i>
        <input
          type='text'
          name='keyword'
          placeholder='Poste, mot-clé'
          value={filters.keyword}
          onChange={handleInputChange}
          className='filter__input'
        />
      </div>
      {/* 2. LOCALISATION */}
      <div className='filter__search'>
        <i className='fa-solid fa-location-dot input-icon filter__icon'></i>
        <input
          type='text'
          name='location'
          placeholder='Ville'
          value={filters.location}
          onChange={handleInputChange}
          className='filter__input'
        />
      </div>
      {/* 3. SECTION CONTRATS */}
      {/* On ouvre le wrapper ici et on ne le ferme qu'à la toute fin */}
      <div className='filter__dropdown-wrapper' ref={dropdownRef}>
        {/* === VERSION MOBILE (Bouton + Dropdown) === */}
        {/* On ajoute une classe pour pouvoir le cacher en CSS sur Desktop */}
        <div className='filter__mobile-view'>
          <Button
            text='Contrat'
            bgColor='var(--color-secondary)'
            textColor='#ffffff'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            fullWidth={false}
            icon={
              <i
                className={`fa-solid fa-chevron-${
                  isDropdownOpen ? 'up' : 'down'
                }`}
              ></i>
            }
            type='button'
          />

          {isDropdownOpen && (
            <div className='filter__dropdown-menu'>
              <div className='filter__checkbox-list'>
                {contractOptions.map((option) => (
                  <label key={`mob-${option.id}`} className='checkbox-item'>
                    <input
                      type='checkbox'
                      value={option.id}
                      checked={filters.contractTypes.includes(option.id)}
                      onChange={handleCheckboxChange} // Attention: onChange, pas onClick
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* === VERSION DESKTOP (Liste à plat) === */}
        {/* On ajoute une classe pour pouvoir le cacher en CSS sur Mobile */}
        <div className='filter__desktop-view'>
          <label className='filter__label'>Type de contrat</label>
          <div className='filter__checkbox-list'>
            {contractOptions.map((option) => (
              <label key={`desk-${option.id}`} className='checkbox-item'>
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
        </div>
      </div>
    </form>
  );
};

export default OffersFilters;
