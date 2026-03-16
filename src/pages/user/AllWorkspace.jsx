import React from 'react'
import WorkspaceCard from "@/components/shared/WorkspaceCard";
import { useVisibleWorkspace } from '@/hooks/useVisibleWorkspaces';

const AllWorkspace = () => {
  
  const {visibleWorkspaces, workspaceLoading, authLoading} = useVisibleWorkspace();
  const pageLoading = workspaceLoading || authLoading;

  if(pageLoading) return (
    <div>Loading...</div>
  )

  return (
    
    <div>
      {/* <WorkspaceLayout/> */}
      <h1>Your Workspaces</h1>
      <div className='p-4'>
         <div className="h-screen overflow-y-auto pr-2 custom-scrollbar">
            {visibleWorkspaces.length === 0 && (
              <div>Create a Workspace to get started</div>
            )}
            {visibleWorkspaces.map((ws) => (
              <WorkspaceCard key={ws.id} data={ws} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default AllWorkspace