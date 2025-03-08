import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { getSportById, updateSport, deleteSport } from '../../services/sportService'

const EditSport = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sportName, setSportName] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSport = async () => {
      const sport = await getSportById(id)
      if (sport) {
        setSportName(sport.sportName)
        setImagePreview(`${import.meta.env.VITE_PATH_IMAGE}sports/${sport.image}`)
      }
      setLoading(false)
    }
    fetchSport()
  }, [id])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const updatedSport = await updateSport(id, sportName, image)
    if (updatedSport) {
      alert('Sport updated successfully!')
      navigate('/sports')
    } else {
      alert('Failed to update sport.')
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sport?')) {
      setLoading(true)
      const success = await deleteSport(id)
      if (success) {
        alert('Sport deleted successfully!')
        navigate('/sports')
      } else {
        alert('Failed to delete sport.')
      }
      setLoading(false)
    }
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Edit Sport</h5>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <CSpinner color="primary" />
        ) : (
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="sportName">Sport Name</CFormLabel>
              <CFormInput
                id="sportName"
                value={sportName}
                onChange={(e) => setSportName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormLabel>Sport Image</CFormLabel>
              {imagePreview && (
                <div className="mb-2">
                  <img src={imagePreview} alt="Sport" style={{ width: '150px', height: 'auto' }} />
                </div>
              )}
              <CFormInput type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <CButton type="submit" color="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </CButton>
            <CButton color="secondary" className="ms-2" onClick={() => navigate('/sports')}>
              Cancel
            </CButton>
            <CButton color="danger" className="ms-2" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </CButton>
          </CForm>
        )}
      </CCardBody>
    </CCard>
  )
}

export default EditSport
