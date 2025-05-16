import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectOwnerSearcher {
  constructor(private repository: ProjectRepository) {}

  async run(ownerId: string): Promise<Project[]> {
    const ownerIdVO = new Uuidv7(ownerId)

    return this.repository.findByOwner(ownerIdVO)
  }
}
