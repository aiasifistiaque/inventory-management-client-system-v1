import React from 'react';
import styles from './Util.module.css';

const Margins = () => {
	return <div>Margins</div>;
};

export const Hr = ({ size }) => {
	return <div className={styles.hr} />;
};

export const Mr = ({ size }) => {
	return <div style={{ marginRight: size ? size : 8 }} />;
};
export const Ml = ({ size }) => {
	return <div style={{ merginLeft: size ? size : 8 }} />;
};
export const Mt = ({ size }) => {
	return <div style={{ marginTop: size ? size : 8 }} />;
};
export const Mb = ({ size }) => {
	return <div style={{ marginBottom: size ? size : 8 }} />;
};

export default Margins;
