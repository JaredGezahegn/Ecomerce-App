import { useState, useRef, useEffect } from 'react';
import { useLang } from '../../context/LangContext';

const SearchFilter = ({ onFilterChange }) => {
    const { t } = useLang();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [
        { value: 'all', label: t('search.allCategories'), icon: 'bi-grid-3x3-gap' },
        { value: 'Electronics', label: t('search.electronics'), icon: 'bi-laptop' },
        { value: 'Groceries', label: t('search.groceries'), icon: 'bi-cart3' },
        { value: 'Clothing', label: t('search.clothing'), icon: 'bi-bag' },
        { value: 'Beauty', label: t('search.beauty'), icon: 'bi-stars' }
    ];

    const sortOptions = [
        { value: '', label: t('search.default'), icon: 'bi-list-ul' },
        { value: 'price_asc', label: t('search.priceLowHigh'), icon: 'bi-arrow-up' },
        { value: 'price_desc', label: t('search.priceHighLow'), icon: 'bi-arrow-down' },
        { value: 'name', label: t('search.nameAZ'), icon: 'bi-sort-alpha-down' },
        { value: 'rating', label: t('search.rating'), icon: 'bi-star-fill' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange({ search: value, category, sortBy });
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        onFilterChange({ search: searchTerm, category: value, sortBy });
        setShowDropdown(false);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        onFilterChange({ search: searchTerm, category, sortBy: value });
        setShowDropdown(false);
    };

    const getCurrentCategoryLabel = () => {
        return categories.find(c => c.value === category)?.label || t('search.allCategories');
    };

    const getCurrentCategoryIcon = () => {
        return categories.find(c => c.value === category)?.icon || 'bi-grid-3x3-gap';
    };

    const hasActiveFilters = searchTerm || category !== 'all' || sortBy;

    return (
        <div className="simple-search-container">
            <div className="container px-4 px-lg-5">
                <div className="simple-search-wrapper">
                    <div className="simple-search-bar">
                        <i className="bi bi-search search-icon-input"></i>
                        <input
                            type="text"
                            className="simple-search-input"
                            placeholder={t('search.placeholder') || 'What are you looking for?'}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        
                        <div className="simple-filter-dropdown" ref={dropdownRef}>
                            <button 
                                className="simple-filter-btn"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <i className={`bi ${getCurrentCategoryIcon()}`}></i>
                                {getCurrentCategoryLabel()}
                                <i className={`bi bi-chevron-${showDropdown ? 'up' : 'down'} chevron-icon`}></i>
                            </button>

                            {showDropdown && (
                                <div className="simple-dropdown-menu">
                                    <div className="dropdown-columns">
                                        <div className="dropdown-column">
                                            <div className="dropdown-section-title">
                                                <i className="bi bi-tag"></i>
                                                {t('search.category')}
                                            </div>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat.value}
                                                    className={`dropdown-item ${category === cat.value ? 'active' : ''}`}
                                                    onClick={() => handleCategoryChange(cat.value)}
                                                >
                                                    <i className={`bi ${cat.icon}`}></i>
                                                    <span>{cat.label}</span>
                                                    {category === cat.value && <i className="bi bi-check2 check-icon"></i>}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="dropdown-divider-vertical"></div>

                                        <div className="dropdown-column">
                                            <div className="dropdown-section-title">
                                                <i className="bi bi-sort-down"></i>
                                                {t('search.sortBy')}
                                            </div>
                                            {sortOptions.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    className={`dropdown-item ${sortBy === opt.value ? 'active' : ''}`}
                                                    onClick={() => handleSortChange(opt.value)}
                                                >
                                                    <i className={`bi ${opt.icon}`}></i>
                                                    <span>{opt.label}</span>
                                                    {sortBy === opt.value && <i className="bi bi-check2 check-icon"></i>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="simple-search-btn">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>

                    {hasActiveFilters && (
                        <button 
                            className="simple-clear-btn"
                            onClick={() => {
                                setSearchTerm('');
                                setCategory('all');
                                setSortBy('');
                                onFilterChange({ search: '', category: 'all', sortBy: '' });
                            }}
                        >
                            <i className="bi bi-x-circle"></i> {t('search.reset')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
