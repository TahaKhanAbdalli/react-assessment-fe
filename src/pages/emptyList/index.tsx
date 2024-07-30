import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './index.css';
const EmptyList = () => {
    const navigate =useNavigate();
    const { t } = useTranslation('translation', {
        keyPrefix: 'Empty List',
    });
    return (
        <div className='emptylist-container'>
            <div className='emptylist-content'>
                <h2 className="">{t("title")}</h2>
                <button type="submit" onClick={() => navigate("/app/create")}>{t("btn text")}</button>
            </div>

        </div>
    )
}

export default EmptyList;
