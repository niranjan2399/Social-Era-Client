import React from 'react'
import { Search } from '@material-ui/icons'
import './search.scss'

function SearchBar() {
	return (
		<div className='search'>
			<Search className='searchIcon' />
			<input type="text" name="" id="" placeholder='Search for a friend, post or video' />
		</div>
	)
}

export default SearchBar
