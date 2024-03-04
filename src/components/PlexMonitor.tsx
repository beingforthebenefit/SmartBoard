import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Text } from '@nextui-org/react'

type LibraryCounts = {
    Movies: number
    'TV Shows': number
}

type Session = {
    artUrl: string
    title: string
    type: 'episode' | 'movie'
    user: string
    year: number
    grandparentTitle?: string // For TV shows
    seasonNumber?: number // For TV shows
    episodeNumber?: number // For TV shows
    duration: number
    viewOffset: number
    state: 'playing' | 'paused'
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: 10px;
  background: rgba(49, 46, 46, 0.5);
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; // Prevents content from spilling out
`

const TitleContainer = styled.div`
  padding: 10px;
  text-align: center;
`

const CountsContainer = styled.div`
  display: flex;
  justify-content: space-around; // Spreads out the items
  flex-wrap: wrap; // Allows items to wrap to the next line on smaller screens
  padding: 10px;
  color: white;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: center;
  overflow-y: auto; // Allows scrolling for overflow content
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(49, 46, 46, 0.5);
  border-radius: 10px;
  margin: 10px 0; // Only vertical margin
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; // Ensure items do not exceed their container's width
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  max-width: 300px;
`

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const PlexMonitor = () => {
    const [libraryCounts, setLibraryCounts] = useState<LibraryCounts>({ Movies: 0, 'TV Shows': 0 })
    const [sessions, setSessions] = useState<Session[]>([])
  
    const PLEX_TOKEN = process.env.REACT_APP_PLEX_TOKEN
    const BASE_URL = process.env.REACT_APP_PLEX_SERVER_URL

    // SVG Icons
    const titleIconSVG = `<svg viewBox="0 0 1024 1024" width="25" height="25" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M861.9 383.8H218.1c-36.4 0-66.1-29.8-66.1-66.1V288c0-36.4 29.8-66.1 66.1-66.1h643.8c36.4 0 66.1 29.8 66.1 66.1v29.7c0 36.3-29.8 66.1-66.1 66.1z" fill="#FFB89A" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #702100;"></path><path d="M822.9 129.2H199.8c-77.2 0-140.4 63.2-140.4 140.4v487.2c0 77.2 63.2 140.4 140.4 140.4h623.1c77.2 0 140.4-63.2 140.4-140.4V269.6c0-77.2-63.2-140.4-140.4-140.4z m80.4 177H760.4L864.6 201c5.4 3.3 10.4 7.3 15 11.8 15.3 15.3 23.7 35.4 23.7 56.8v36.6z m-673.3 0l104-117h61.3l-109.1 117H230z m247.4-117h169.2L532 306.2H368.3l109.1-117z m248.8 0h65.6L676 306.2h-60l112.5-114.8-2.3-2.2zM143 212.9c15.3-15.3 35.4-23.7 56.8-23.7h53.9l-104 117h-30.4v-36.5c0.1-21.4 8.5-41.5 23.7-56.8z m736.6 600.7c-15.3 15.3-35.4 23.7-56.8 23.7h-623c-21.3 0-41.5-8.4-56.8-23.7-15.3-15.3-23.7-35.4-23.7-56.8V366.2h783.9v390.6c0.1 21.3-8.3 41.5-23.6 56.8z" fill="#45484C" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #373b3d;"></path><path d="M400.5 770.6V430.9L534.1 508c14.3 8.3 19.3 26.6 11 41-8.3 14.3-26.6 19.3-41 11l-43.6-25.2v131.8l114.1-65.9-7.5-4.3c-14.3-8.3-19.3-26.6-11-41 8.3-14.3 26.6-19.3 41-11l97.5 56.3-294.1 169.9z" fill="#33CC99" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #29a385;"></path></g></svg>`
    const userIconSVG = `<svg viewBox="0 0 1024 1024" width="25" height="25" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #000000;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M691.573 338.89c-1.282 109.275-89.055 197.047-198.33 198.331-109.292 1.282-197.065-90.984-198.325-198.331-0.809-68.918-107.758-68.998-106.948 0 1.968 167.591 137.681 303.31 305.272 305.278C660.85 646.136 796.587 503.52 798.521 338.89c0.811-68.998-106.136-68.918-106.948 0z" fill="#4A5699" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #3b457a;"></path><path d="M294.918 325.158c1.283-109.272 89.051-197.047 198.325-198.33 109.292-1.283 197.068 90.983 198.33 198.33 0.812 68.919 107.759 68.998 106.948 0C796.555 157.567 660.839 21.842 493.243 19.88c-167.604-1.963-303.341 140.65-305.272 305.278-0.811 68.998 106.139 68.919 106.947 0z" fill="#C45FA0" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #853167;"></path><path d="M222.324 959.994c0.65-74.688 29.145-144.534 80.868-197.979 53.219-54.995 126.117-84.134 201.904-84.794 74.199-0.646 145.202 29.791 197.979 80.867 54.995 53.219 84.13 126.119 84.79 201.905 0.603 68.932 107.549 68.99 106.947 0-1.857-213.527-176.184-387.865-389.716-389.721-213.551-1.854-387.885 178.986-389.721 389.721-0.601 68.991 106.349 68.933 106.949 0.001z" fill="#E5594F" data-darkreader-inline-fill="" style="--darkreader-inline-fill: #961f16;"></path></g></svg>`
    const playIconSVG = `<svg viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" stroke-width="2" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"></path> </g></svg>`
    const pauseIconSVG = `<svg viewBox="0 0 24 24" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke: #e8e6e3;"></path> </g></svg>`

    // Fetch data from Plex
    const fetchData = async (endpoint: string): Promise<any> => {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { 'X-Plex-Token': PLEX_TOKEN },
        responseType: 'json'
      })
      return response.data
    }
  
    
  
    useEffect(() => {
      const initiateDataFetch = async () => {
        try {
          // Fetch and set library counts
          const moviesResponse = await fetchData('/library/sections/1/all')
          const movieCount = moviesResponse?.MediaContainer?.size
          const tvShowsResponse = await fetchData('/library/sections/2/all')
          const tvShowCount = tvShowsResponse?.MediaContainer?.size
          setLibraryCounts({ Movies: movieCount, 'TV Shows': tvShowCount })

          // Fetch and process current sessions
          const sessionsResponse = await fetchData('/status/sessions')
          const videos = sessionsResponse.MediaContainer.Metadata
          const processedSessions: Session[] = videos.map(video => {
            const session: Partial<Session> = {
              artUrl: video.type === 'movie' ? video.thumb : video.parentThumb,
              title: video.title,
              type: video.type,
              user: video.User.title,
              year: video.year,
              duration: video.duration,
              viewOffset: video.viewOffset,
              state: video.Player.state
            }

            if (session.type === 'episode') {
              session.grandparentTitle = video.grandparentTitle
              session.seasonNumber = video.parentIndex
              session.episodeNumber = video.index
            }

            return session as Session
          })
          setSessions(processedSessions)
        } catch (error) {
          console.error('Error fetching data from Plex:', error)
        }
      }

      initiateDataFetch()
      const interval = setInterval(initiateDataFetch, 60000)
      return () => clearInterval(interval)
    }, [])
  
    return (
        <Container>
          <TitleContainer>
            <Text h1>76Flix</Text>
          </TitleContainer>
          <CountsContainer>
            {Object.entries(libraryCounts).map(([key, value]) => (
              <Text key={key}>{`${key}: ${value}`}</Text>
            ))}
          </CountsContainer>
          <Content>
            {sessions.map((session, index) => (
              <Item key={index}>
                <img className="thumbnail" src={`${BASE_URL}${session.artUrl}?X-Plex-Token=${PLEX_TOKEN}`} alt={session.title} />
                <ItemInfo>
                  {session.type === 'episode' ? (
                    <Row>
                      <div dangerouslySetInnerHTML={{ __html: titleIconSVG }} />
                      <span>{session.grandparentTitle}</span>
                      <span>S{session.seasonNumber} E{session.episodeNumber}: {session.title}</span>
                    </Row>
                  ) : (
                    <Row>
                      <div dangerouslySetInnerHTML={{ __html: titleIconSVG }} />
                      <span>{session.title} ({session.year})</span>
                    </Row>
                  )}
                  <Row>
                    <div dangerouslySetInnerHTML={{ __html: userIconSVG }} />
                    <span>{session.user}</span>
                  </Row>
                  <Row>
                    <div dangerouslySetInnerHTML={{ __html: session.state === 'playing' ? playIconSVG : pauseIconSVG }} />
                    <span>{session.state === 'playing' ? 'Playing' : 'Paused'}</span>
                  </Row>
                  <div className="progress-bar" style={{ width: `${(session.viewOffset / session.duration) * 100}%` }}></div>
                </ItemInfo>
              </Item>
            ))}
          </Content>
        </Container>
      )
  }
  
  export default PlexMonitor