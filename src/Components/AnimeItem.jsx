import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

const AnimeItem = () => {
	const { id } = useParams()

	//state
	const [anime, setAnime] = React.useState({})
	const [characters, setCharacters] = React.useState([])
	const [showMore, setShowMore] = React.useState(false)
	const [loading, setLoading] = React.useState(true)

	//destructure anime
	const {
		title,
		synopsis,
		trailer,
		duration,
		aired,
		season,
		images,
		rank,
		score,
		scored_by,
		popularity,
		status,
		rating,
		source,
	} = anime

	//get anime based on id
	const getAnime = async (anime) => {
		const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
		const data = await response.json()
		setAnime(data.data)
	}

	//get characters
	const getCharacters = async (anime, limit = 10) => {
		try {
			const response = await fetch(
				`https://api.jikan.moe/v4/anime/${anime}/characters`
			)
			const data = await response.json()
			setCharacters(data.data.slice(0, limit))
		} catch (error) {
			alert('Error fetching characters:', error)
		}
	}

	//initial render
	useEffect(() => {
		const fetchData = async () => {
			try {
				await getAnime(id)
				await getCharacters(id, 10)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id])

	return (
		<AnimeItemStyled>
			<div className='back'>
				<Link to='/'>
					<i className='fas fa-arrow-left'></i>
					Back to Home
				</Link>
			</div>
			<h1>{title}</h1>
			<div className='details'>
				<div className='detail'>
					<div className='image'>
						<img
							src={images?.jpg.large_image_url}
							alt=''
						/>
					</div>
					<div className='anime-details'>
						<p>
							<span>Aired: {aired?.string}</span>
						</p>

						<p>
							<span>Rating: {rating}</span>
						</p>
						<p>
							<span>Rank: {rank}</span>
						</p>
						<p>
							<span>Score: {score}</span>
						</p>
						<p>
							<span>Scored By: {scored_by}</span>
						</p>
						<p>
							<span>Popularity: {popularity}</span>
						</p>
						<p>
							<span>Status: {status}</span>
						</p>
						<p>
							<span>Source: {source}</span>
						</p>
						<p>
							<span>Season: {season}</span>
						</p>
						<p>
							<span>Duration: {duration}</span>
						</p>
					</div>
				</div>
				<p className='description'>
					{showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
					<button
						onClick={() => {
							setShowMore(!showMore)
						}}
					>
						{showMore ? 'Show Less' : 'Read More'}
					</button>
				</p>
			</div>
			<h3 className='title'>Trailer</h3>
			<div className='trailer-con'>
				{trailer?.embed_url ? (
					<iframe
						src={trailer?.embed_url}
						title='Inline Frame Example'
						width='800'
						height='450'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				) : (
					<h3>Trailer not available</h3>
				)}
			</div>
			<h3 className='title'>Popular Characters</h3>
			{loading ? (
				<h3>Loading...</h3>
			) : (
				<div className='characters'>
					{characters &&
						characters.map((character) => {
							const { role } = character
							const { images, name, mal_id } = character.character
							return (
								<Link
									to={`/character/${mal_id}`}
									key={character.character.mal_id}
								>
									<div className='character'>
										<img
											src={images?.jpg.image_url}
											alt=''
										/>
										<h4>{name}</h4>
										<p>{role}</p>
									</div>
								</Link>
							)
						})}
				</div>
			)}
		</AnimeItemStyled>
	)
}

const AnimeItemStyled = styled.div`
	padding: 3rem 18rem;
	background-color: #1e293b;

	.back {
		position: absolute;
		top: 2rem;
		left: 2rem;
		a {
			font-weight: 600;
			text-decoration: none;
			color: #eb5757;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}
	h1 {
		display: inline-block;
		font-size: 3rem;
		margin-bottom: 1.5rem;
		cursor: pointer;
		background-color: #ea580c;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		transition: all 0.4s ease-in-out;
		&:hover {
			transform: skew(-3deg);
		}
	}
	.title {
		display: inline-block;
		margin: 3rem 0;
		font-size: 2rem;
		cursor: pointer;
		background-color: #ea580c;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.description {
		margin-top: 2rem;
		color: #6c7983;
		line-height: 1.7rem;
		button {
			background-color: transparent;
			border: none;
			outline: none;
			cursor: pointer;
			font-size: 1.2rem;
			color: #27ae60;
			font-weight: 600;
		}
	}

	.trailer-con {
		display: flex;
		justify-content: center;
		align-items: center;
		iframe {
			outline: none;
			border: 5px solid #e5e7eb;
			padding: 1.5rem;
			border-radius: 10px;
			background-color: #ffffff;
		}
	}

	.details {
		background-color: #fff;
		border-radius: 20px;
		padding: 2rem;
		border: 5px solid #e5e7eb;

		.detail {
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			img {
				border-radius: 7px;
			}
		}

		.anime-details {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			p {
				display: flex;
				gap: 1rem;
			}

			p span:first-child {
				font-weight: 600;
				color: #454e56;
			}
		}

		@media screen and (max-width: 768px) {
			padding: 1.5rem;

			.detail {
				img {
					width: 100%;
					margin-bottom: 1rem;
				}
			}

			.anime-details {
				p {
					flex-direction: column;
					gap: 0.5rem;
				}
			}
		}
	}

	.characters {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 2rem;
		background-color: #fff;
		padding: 2rem;
		border-radius: 20px;
		border: 5px solid #e5e7eb;
		.character {
			padding: 0.4rem 0.6rem;
			border-radius: 7px;
			background-color: #ededed;
			transition: all 0.4s ease-in-out;
			img {
				width: 100%;
			}
			h4 {
				padding: 0.5rem 0;
				color: #454e56;
			}
			p {
				color: #27ae60;
			}
			&:hover {
				transform: translateY(-5px);
			}
		}
	}
	@media screen and (max-width: 768px) {
		padding: 3rem 1rem;
	}
`

export default AnimeItem
