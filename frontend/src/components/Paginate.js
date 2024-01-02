import { Pagination, PaginationItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Paginate({ pages, page, isAdmin = false, keyword = '' }) {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <PaginationItem key={x + 1}>
                        <Link
                            to={
                                !isAdmin
                                    ? keyword
                                        ? `/search/${keyword}/page/${x + 1}`
                                        : `/page/${x + 1}`
                                    : `/admin/productlist/${x + 1}`
                            }
                        >
                            {x + 1}
                        </Link>
                    </PaginationItem>
                ))
                }
            </Pagination >
        )

    )
}
