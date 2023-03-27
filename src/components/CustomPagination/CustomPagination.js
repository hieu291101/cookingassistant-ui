import Pagination from 'react-bootstrap/Pagination';
import classNames from 'classnames/bind';
import styles from './CustomPagination.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);

CustomPagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

CustomPagination.defaultProps = {
    onPageChange: null,
};

function CustomPagination(props) {
    const { pagination, onPageChange } = props;
    const { page, limit, totalRows } = pagination;
    const totalPages = Math.ceil(totalRows / limit);

    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    // const handlePageChangeClick = (e) => {
    //     e.preventDefault();
    //     console.log()
    // }

    const pages = () => {
        const pagesArray = [];
        for (var i = 0; i < totalPages; i++) {
            pagesArray.push(<Pagination.Item key={i} className={`${page === (i+1) ? "active" : ""}`} onClick={(e) => handlePageChange(Number(e.target.innerText))}>{i + 1}</Pagination.Item>);
        }
        return pagesArray;
    };
    return (
        <Pagination className={cx('pagination', 'recipe-pagination')}>
            <Pagination.First disabled={page <= 1} onClick={() => handlePageChange(1)}/>
            <Pagination.Prev disabled={page <= 1} onClick={() => handlePageChange(page - 1)} />
            {pages()}
            <Pagination.Next disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)} />
            <Pagination.Last disabled={page >= totalPages} onClick={() => handlePageChange(totalPages)}/>
        </Pagination>
    );
}

export default CustomPagination;
