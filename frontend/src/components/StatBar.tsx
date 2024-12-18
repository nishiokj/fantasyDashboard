import React from 'react';
import PropTypes from 'prop-types';
import './StatBar.css';

interface StatBarProps {
  props: {
    values: {
      [key: string]: string | number;
    };
    paddingTop?: string;
  }
}

/**
 * StatBar Component
 * Displays a list of statistical values.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.values - Key-value pairs representing statistics
 */
export default function StatBar({ props }: StatBarProps) {
    const { values, paddingTop } = props;
    console.log(values);
    return (
        <div className="stat-bar" style={{padding: paddingTop}}>
            {Object.keys(values).map((columnName) => (
                <div key={columnName} className="stat-item">
                    <h3 className="stat-title">{columnName}</h3>
                    <p className="stat-value">{values[columnName]}</p>
                </div>
            ))}
        </div>
    );
}