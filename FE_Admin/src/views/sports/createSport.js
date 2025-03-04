import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton } from '@coreui/react'

const CreateSport = () => {
  const [sportName, setSportName] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('sportName', sportName)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/sports', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSportName('')
        setImage(null)
        setPreview(null)
        navigate('/sports')
        // alert('Sport created successfully!')
      } else {
        alert('Failed to create sport')
      }
    } catch (error) {
      console.error('Error creating sport:', error)
    }
  }

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>Create Sport</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              placeholder="Sport Name"
              required
            />
            <CFormInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-3" style={{ width: '200px' }} />
            )}
            <CButton color="primary" type="submit" className="mt-3">
              Create Sport
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default CreateSport
