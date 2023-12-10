import React from 'react'
import { useGlobalContext } from '../Context/Global'
import { Link } from 'react-router-dom'

const PopularAnime = ({ rendered }) => {
	const { popularAnime, isSearch, searchResults } = useGlobalContext()

	const conditionalRender = () => {
		if (!isSearch && rendered === 'popular') {
			return popularAnime?.map((anime) => {
				return (
					<Link
						to={`/anime/${anime.mal_id}`}
						key={anime.mal_id}
					>
						<img
							src={anime.images.jpg.large_image_url}
							alt=''
						/>
					</Link>
				)
			})
		} else {
			return searchResults?.map((anime) => {
				return (
					<Link
						to={`/anime/${anime.mal_id}`}
						key={anime.mal_id}
					>
						<img
							src={anime.images.jpg.large_image_url}
							alt=''
						/>
					</Link>
				)
			})
		}
	}

	return (
		<div className='flex'>
			<div className='mt-8 pt-8 pb-8 pl-20 pr-0 w-full grid bg-white'>
				{conditionalRender()}
			</div>
		</div>
	)
}

export default PopularAnime
