import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectRemoveMember {
  constructor(
    readonly repository: ProjectRepository,
    readonly finder: ProjectFinder,
  ) {
    this.finder = new ProjectFinder(repository)
  }

  async run({ member, project }: { project: string; member: string }) {
    const result = await this.finder.run({ id: project })
    if (!result) {
      throw new Error(`Project ${project} not found`)
    }
    const projectWithoutMember = result.removeMember(new Uuidv7(member))
    await this.repository.update(projectWithoutMember)
  }
}
