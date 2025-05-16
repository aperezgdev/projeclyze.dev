import { Optional } from '../../Shared/domain/Optional'
import { Uuidv7 } from '../../Shared/domain/value-object/Uuidv7'
import { InMemoryRepository } from '../../Shared/infrastructure/InMemoryRepository'
import { Project } from '../domain/Project'
import { ProjectRepository } from '../domain/ProjectRepository'

export class InMemoryProjectRepository
  extends InMemoryRepository<Project>
  implements ProjectRepository
{
  protected data: Project[] = [
    Project.fromPrimitives({
      id: '0196959b-349e-7683-a2ab-24ea33d93662',
      title: 'Project 1',
      description: 'Project 1 description',
      owner: '0196959b-349e-7683-a2ab-24ea33d93662',
      members: ['0196959b-349e-7683-a2ab-24ea33d93662'],
      createdOn: '2022-01-01T00:00:00.000Z',
      updatedOn: '2022-01-01T00:00:00.000Z',
    }),
  ]

  findByOwner(owner: Uuidv7): Promise<Project[]> {
    this.data.filter((p) => p.owner.value === owner.value)
    return Promise.resolve(this.data)
  }
  findById(id: Uuidv7): Promise<Optional<Project>> {
    return Promise.resolve(Optional.of(this.data.find((p) => p.id.value === id.value)))
  }
  save(project: Project): Promise<Project> {
    this.data.push(project)
    return Promise.resolve(project)
  }
  update(project: Project): Promise<Project> {
    this.data = this.data.map((p) => (p.id.value === project.id.value ? project : p))
    return Promise.resolve(project)
  }
  delete(id: Uuidv7): Promise<void> {
    this.data = this.data.filter((p) => p.id.value !== id.value)
    return Promise.resolve()
  }
}
