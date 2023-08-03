
import { User } from "src/modules/user/entities/user.entity";
import { UserResponseDTO } from 'src/modules/user/dto/user-response.dto';
export function convertUsersToDTO(users: User[]) {
    const userResponseDTOs = users.map(user => {
        const userResponseDTO = new UserResponseDTO();
        userResponseDTO.id = user.id;
        userResponseDTO.name = user.name;
        userResponseDTO.username = user.username;
        userResponseDTO.email = user.email;
        userResponseDTO.roles = user.roles;
        userResponseDTO.dateOfBirth = user.dateOfBirth;
        userResponseDTO.score = user.score;
        userResponseDTO.level = user.level;
        userResponseDTO.completedQuizzes = user.completedQuizzes;
        userResponseDTO.favoriteQuizzes = user.favoriteQuizzes;
        userResponseDTO.friends = user.friends;
        userResponseDTO.level = user.level;
        userResponseDTO.avatar = user.avatar;
        userResponseDTO.loginType = user.loginType;
        return userResponseDTO;
    });

    return userResponseDTOs;
}
export function mapUserToUserResponseDTO(user: User) {
    const userResponse = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        roles: user.roles,
        dateOfBirth: user.dateOfBirth,
        score: user.score,
        level: user.level,
        completedQuizzes: user.completedQuizzes,
        favoriteQuizzes: user.favoriteQuizzes,
        friends: user.friends,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        active: user.active,
        avatar: user.avatar,
        createdQuizzes: user.createdQuizzes,
        quizSessions: user.quizSessions,
        loginType: user.loginType,
        token: user.token
    };

    return userResponse;
}
