import { firebaseDb } from '@/firebase'
import type { Group, Task } from '@/types'
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc } from 'firebase/firestore'

async function firebaseUpsertGroup(group: Group) {
  try {
    const groupRef = doc(firebaseDb, import.meta.env.VITE_FIRESTORE_GROUPS_COLLECTION_KEY, group.id)
    await setDoc(groupRef, group, { merge: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    alert(`Error saving group: ${message}`)
  }
}

async function firebaseUpdateTodos(todos: Task[], groupId: string) {
  try {
    const groupRef = doc(firebaseDb, import.meta.env.VITE_FIRESTORE_GROUPS_COLLECTION_KEY, groupId)
    await setDoc(groupRef, { tasks: todos }, { merge: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    alert(`Error saving/deleting task: ${message}`)
  }
}

async function firebaseGetGroups(): Promise<Group[]> {
  try {
    const groupsCol = collection(firebaseDb, import.meta.env.VITE_FIRESTORE_GROUPS_COLLECTION_KEY)
    const groupsSnapshot = await getDocs(groupsCol)

    const groups: Group[] = groupsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        tasks: data.tasks,
      }
    })

    return groups
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    alert(`Error getting groups: ${message}`)
    return []
  }
}

function firebaseObserveGroups(callbackfn: (groups: Group[]) => void) {
  const groupsCol = collection(firebaseDb, import.meta.env.VITE_FIRESTORE_GROUPS_COLLECTION_KEY)
  return onSnapshot(
    query(
      groupsCol,
      // where('userId', '==', userID)
    ),
    {
      next: (snaps) => {
        const result = snaps.docs.map((doc) => doc.data() as Group)
        callbackfn(result)
      },
      error: (e) => {
        const message = e instanceof Error ? e.message : String(e)
        alert(`Error observing groups: ${message}`)
        callbackfn([])
      },
    },
  )
}

async function firebaseDeleteGroup(groupId: string): Promise<void> {
  try {
    const groupRef = doc(firebaseDb, 'groups', groupId)
    await deleteDoc(groupRef)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    alert(`Error deleting group(${groupId}): ${message}`)
  }
}

export {
  firebaseUpsertGroup,
  firebaseUpdateTodos,
  firebaseGetGroups,
  firebaseDeleteGroup,
  firebaseObserveGroups,
}
