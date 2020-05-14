import React from 'react';
import PropTypes from 'prop-types';

const ModuleHeader = ({ title }) => <h2 className="module-header">{title}</h2>;

ModuleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModuleHeader;
