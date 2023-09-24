import React, { useState } from 'react'
import NewWorkspaceModal from '../NewWorkspaceModal'

const Layout = ({children}: any) => {
    const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState<boolean>(false)
    const [workspaceName, setWorkspaceName] = useState<string>("");

    const toggleWorkspaceModal = () => {
        setShowNewWorkspaceModal(!showNewWorkspaceModal)
    }
  return (
    <div className='h-full'>
        {children}
        {showNewWorkspaceModal &&  <NewWorkspaceModal toggleWorkspaceModal={toggleWorkspaceModal} workspaceName={workspaceName} setWorkspaceName={setWorkspaceName}  />}
       
    </div>
  )
}

export default Layout