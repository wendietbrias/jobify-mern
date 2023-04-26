import { useState } from 'react';
import {
    MdKeyboardDoubleArrowRight,
    MdKeyboardDoubleArrowLeft
} from 'react-icons/md';

interface pagination {
    page:number,
    count:number,
    setPage:any
}

const Pagination = ({ page,count,setPage } : pagination) => {

    const totalPage = Math.ceil(count / 10);
    const pages = [];
  
    for(let i = 0; i < totalPage; i++) {
        pages.push(i+1);
    }

    return (
        <div className="pagination">
            <button className="next">
                <MdKeyboardDoubleArrowLeft className='icon'/>
                Prev
            </button>
            {pages.map((pageLoop,idx) => <button className={`paginate-count ${pageLoop == page ? 'active':''}`} key={idx}>{pageLoop}</button>)}
            <button className="prev">
                Next
                <MdKeyboardDoubleArrowRight className='icon'/>
            </button>
        </div>
    )
}

export default Pagination;