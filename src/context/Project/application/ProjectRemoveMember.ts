import { Logger } from '@projeclyze/context/Shared/domain/Logger';
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { ProjectFinder } from '../domain/ProjectFinder'
import { ProjectRepository } from '../domain/ProjectRepository'

export class ProjectRemoveMember {
  constructor(
    readonly repository: ProjectRepository,
    readonly finder: ProjectFinder,
    readonly logger: Logger
  ) {
    this.finder = new ProjectFinder(repository, logger)
  }

  async run({ member, project }: { project: string; member: string }) {
    this.logger.log(`Removing member ${member} from project ${project}`)
    const result = await this.finder.run({ id: project })
    const projectWithoutMember = result.removeMember(new Uuidv7(member))
    this.logger.log(`Project ${project} found, removing member ${member}`)
    await this.repository.update(projectWithoutMember)
  }
}
